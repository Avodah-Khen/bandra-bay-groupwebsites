import { notFound } from 'next/navigation'; import { getProjectBySlug } from '@/lib/projects'; import ProjectPage from '@/components/ProjectPage';
export default async function ProjectRoute({params}:{params:{slug:string}}){const project=await getProjectBySlug(params.slug);if(!project)notFound();return <ProjectPage project={project}/>;}
