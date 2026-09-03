import { notFound } from 'next/navigation';
import ProjectPage from '@/components/ProjectPage';
import { getFirstPublishedProject } from '@/lib/projects';
export default async function HomePage(){const project=await getFirstPublishedProject();if(!project)notFound();return <ProjectPage project={project}/>;}
