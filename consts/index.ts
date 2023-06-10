// TODO: consolidate types

type CurrentImageProps = {
  id: number;
  height: string;
  width: string;
  public_id: string;
  format: string;
  blurDataUrl?: string;
  border?: string;
};

export const DIRECTORY_NAME = "deanna-simpson";

export const aspectRatio = (currentImage: CurrentImageProps) =>
  Number(currentImage.width) / Number(currentImage.height);

const currDate = Date.now();
export const currentYear = new Date(currDate).getFullYear();
