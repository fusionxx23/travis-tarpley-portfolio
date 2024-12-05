export interface TProjectProps {
  id: string;
  description: string;
  projectImage: ImageMetadata;
  liveDemoUrl?: string;
  blogPostSlug?: string;
  youtubeModal?: string;
  githubUrl?: string;
  title: string;
}
export interface TWorkProps {
  position?: "start" | "end";
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  jobPosition: string;
}
