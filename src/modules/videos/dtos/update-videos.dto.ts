
import { z } from 'zod';

export type UpdateVideosDto = z.output<typeof UpdateVideos>;
export const UpdateVideos = z.object({});
