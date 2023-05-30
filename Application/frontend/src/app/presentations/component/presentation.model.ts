
export interface Presentation {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
}

export class MediaFile {
    id: number;
    name: string;
    filePath: string;
}

export class Slide {
  id?: number;
  name?: string;
  order: number;
  mediaFile: MediaFile;

  public static readonly imagePath = 'http://localhost:8080/api/resource/';

  constructor(file: MediaFile) {
    this.mediaFile = file;
  }
}
