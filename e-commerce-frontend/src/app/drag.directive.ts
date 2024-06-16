import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FileHandle } from './models/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @HostBinding("style.background") private background = "#eee"
  @Output() files:EventEmitter<FileHandle> = new EventEmitter();
  constructor(private sanitizer:DomSanitizer) { }

  @HostListener("dragover", ["$event"])
  public onDragOver(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop", ["$event"])
  public onDrop(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";
    const file = event.dataTransfer?.files[0];
    let fileHandle: FileHandle;

    if (file) {
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file as Blob));
      fileHandle = { file: file, url: url };
      this.files.emit(fileHandle);
  } else {
      console.error('File is undefined');
  }
  }
}
