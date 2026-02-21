import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

// Architectural Decision:
// This dynamic route handler loads markdown from any submodule in /content/<project>/docs/
// and renders it at /projects/<project>/<...slug>

export default function ProjectDocPage({ source, frontMatter }) {
  return (
    <div className="prose dark:prose-invert mx-auto">
      <MDXRemote {...source} components={{}} />
    </div>
  );
}

export const getStaticPaths = async () => {
  const contentDir = path.join(process.cwd(), 'content');
  const projects = fs.readdirSync(contentDir).filter((f) => fs.statSync(path.join(contentDir, f)).isDirectory());
  let paths = [];
  for (const project of projects) {
    const docsDir = path.join(contentDir, project, 'docs');
    if (!fs.existsSync(docsDir)) continue;
    const walk = (dir, parts = []) => {
      for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) {
          walk(full, [...parts, file]);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
          paths.push({
            params: {
              project,
              slug: [...parts, file.replace(/\.mdx?$/, '')],
            },
          });
        }
      }
    };
    walk(docsDir);
  }
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { project, slug } = params;
  const docPath = path.join(process.cwd(), 'content', project, 'docs', ...slug) + '.mdx';
  const mdPath = docPath.replace(/\.mdx$/, '.md');
  let sourcePath = fs.existsSync(docPath) ? docPath : mdPath;
  const source = fs.readFileSync(sourcePath, 'utf8');
  const { content, data } = matter(source);
  const mdxSource = await serialize(content, { scope: data });
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};
