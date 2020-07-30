import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToArrayKeysPipe } from './to-array-keys.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { EventTypePipe } from './event-type.pipe';

@NgModule({
    declarations: [
        ToArrayKeysPipe, 
        SafeHtmlPipe, 
        EventTypePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ToArrayKeysPipe,
        SafeHtmlPipe,
        EventTypePipe
    ]
})
export class PipesModule {}