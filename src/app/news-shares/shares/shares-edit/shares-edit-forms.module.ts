import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatePickerModule } from '../../shares/shares-edit/date-picker/date-picker.module';
import { GHMTextAreaModule } from '../../../UI/ghm-textarea/ghm-textarea.module';
import { AdminModalModule } from '../../../admin-modal/admin-modal.module';
import { SharesEditComponent } from './shares-edit.component';
import { SharesEditTextComponent } from './shares-edit-controls/shares-edit-text/shares-edit-text.component';
import { SharesEditImageComponent } from './shares-edit-controls/shares-edit-image/shares-edit-image.component';
import { SharesEditFlatsComponent } from './shares-edit-controls/shares-edit-flats/shares-edit-flats.component';
import { SharesEditAnchorComponent } from './shares-edit-controls/shares-edit-anchor/shares-edit-anchor.component';
import { BitNumberPipe } from '../bit-number.pipe';
import { SharesDeleteComponent } from './shares-delete/shares-delete.component';

@NgModule({
    exports: [
        SharesEditComponent,
        SharesEditTextComponent,
        SharesEditImageComponent,
        SharesEditFlatsComponent,
        SharesEditAnchorComponent,
        SharesDeleteComponent,
        BitNumberPipe
    ],
    declarations: [
        SharesEditComponent,
        SharesEditTextComponent,
        SharesEditImageComponent,
        SharesEditFlatsComponent,
        SharesEditAnchorComponent,
        SharesDeleteComponent,
        BitNumberPipe
    ],
    imports: [
        FormsModule,
        GHMTextAreaModule,
        ReactiveFormsModule,
        DatePickerModule,
        CommonModule,
        AdminModalModule
    ]
})

export class SharesEditFormsModule { }
