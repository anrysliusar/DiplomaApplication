import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {SlideApiService} from "../../service/slide-api.service";
import {ProjectTreeNode} from "../../../projects/component/project.model";
import {MediaFile, Slide} from "../presentation.model";
import {HttpEvent, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-slide-configurator',
  templateUrl: './slide-configurator.component.html',
  styleUrls: ['./slide-configurator.component.css'],
  providers: [SlideApiService]
})
export class SlideConfiguratorComponent implements OnInit {
  Slide = Slide;

  @Input()
  presentation: ProjectTreeNode;
  isNewSlide: boolean = false;
  slides: Slide[] = [];
  selectedSlide: Slide;

  constructor(private slideApiService: SlideApiService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadSlides();
  }

  onSave(event: HttpEvent<any>): void {
    const response = <HttpResponse<MediaFile>>event;
    if (response.body) {
      const slide = new Slide(response.body);
      this.slideApiService.createSlide(slide, this.presentation.id)
        .subscribe(() => {
          this.loadSlides();
        });
    }
  }

  onCreateSlide(): void {
    this.isNewSlide = true;
  }

  onSelectSlide(slide: Slide): void {
    this.isNewSlide = false;
    this.selectedSlide = slide;
  }


  private loadSlides(): void {
    this.slideApiService.getSlides(this.presentation.id)
      .subscribe((slides: Slide[]) => {
        this.slides = slides.sort((a, b) => a.order - b.order);
        if (this.slides.length > 0) {
          this.selectedSlide = this.slides[0];
        }
        this.cd.detectChanges();
      }
    );
  }

  delete() {
    this.slideApiService.deleteSlide(this.selectedSlide.id)
      .subscribe(() => {
        this.loadSlides();
      });
  }
}

