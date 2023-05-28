import {Component, Input} from '@angular/core';
import {SlideApiService} from "../../service/slide-api.service";
import {ProjectTreeNode} from "../../../projects/component/project.model";
import {HttpHeaders} from "@angular/common/http";
import {MediaFile, Slide} from "../presentation.model";

@Component({
  selector: 'app-slide-configurator',
  templateUrl: './slide-configurator.component.html',
  styleUrls: ['./slide-configurator.component.css'],
  providers: [SlideApiService]
})
export class SlideConfiguratorComponent {
  @Input()
  presentation: ProjectTreeNode;
  isNewSlide: boolean = false;
  uploadHeaders: HttpHeaders;


  slides: any[] = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
    },
    {
      id: "1001",
      code: "nvklal433",
      name: "Black Watch",
    },
    {
      id: "1002",
      code: "zz21cz3c1",
      name: "Blue Band",
    },
    {
      id: "1003",
      code: "244wgerg2",
      name: "Blue T-Shirt",
    }
  ];

  constructor(private slideApiService: SlideApiService) {
  }

  onUpload(body: MediaFile): void {
    const slide : Slide = {
      mediaFile: {
        id: body.id,
        name: body.name,
        filePath: body.filePath
      }
    }
    console.log(slide)
    this.slideApiService.createSlide(slide, this.presentation.id)
      .subscribe((respSlide: any) => {
        this.slides.push(respSlide);
      });
  }

  onCreateSlide(): void {
    this.isNewSlide = true;
  }

  onSelectSlide($event: MouseEvent): void {
    this.isNewSlide = false;
  }
}

