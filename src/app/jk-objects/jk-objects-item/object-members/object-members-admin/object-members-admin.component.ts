import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ObjectMembersAdminService } from './object-members-admin.service';
import { IMembersAnchor, IObjectMembersSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/members-api/objects-members.interfaces';

@Component({
    selector: 'app-objects-item-members-admin',
    templateUrl: './object-members-admin.component.html',
    styleUrls: ['../../jk-objects-item.component.scss',
        './object-members-admin.component.scss']
})

export class ObjectMembersAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();
    @Input()
    public id: string;
    @Input()
    public snippet: IObjectMembersSnippet;

    public form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private membersService: ObjectMembersAdminService
    ) { }

    ngOnInit() {
        if (this.snippet) {
            this.setFormFromSnippet();
        } else {
            this.setNewForm();
        }
    }

    private setNewForm() {
        this.form = this.formBuilder.group({
            objectId: this.id,
            switchOn: true,
            created_at: new Date(),
            last_modifyed: new Date(),
            data: this.formBuilder.array([])
        });
    }

    private setFormFromSnippet() {
        this.form = this.formBuilder.group({
            objectId: this.snippet.objectId,
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            data: this.parseDataArray()
        });
    }

    private parseDataArray() {
        return this.formBuilder.array(this.snippet.data.map((dataItem) => {
            return this.formBuilder.group({
                name: dataItem.name,
                members: this.parseMembersArray(dataItem.members)
            });
        }));
    }

    private parseMembersArray(members: IMembersAnchor[]) {
        return this.formBuilder.array(members.map((membersItem) => {
            return this.formBuilder.group({
                name: membersItem.name,
                url: membersItem.url
            });
        }));
    }

    public pushData() {
        (this.form.get('data') as FormArray).push(
            this.formBuilder.group({
                name: '',
                members: this.formBuilder.array([])
            })
        );
    }

    public popData(i) {
        (this.form.get('data') as FormArray).removeAt(i);
    }

    public moveBlock(array, i, dir) {
        let arr = this.form.get('data').value;

        array[i] = array.splice((i + dir), 1, array[i])[0];
        arr[i] = arr.splice((i + dir), 1, arr[i])[0];
    }

    public pushMembers(i) {
        (this.form.get(['data', i, 'members']) as FormArray).push(
            this.formBuilder.group({
                name: '',
                url: ''
            })
        );
    }

    public popMembers(i, j) {
        (this.form.get(['data', i, 'members']) as FormArray).removeAt(j);
    }

    public save() {
        this.membersService.setSnippetData(this.form.value).subscribe(
            (data) => {
                this.snippetChange.emit(data);
                this.closeModal.emit(true);
            },
            (err) => {
                alert('Что-то пошло не так!');
                console.error(err);
            });
    }

    public close(isSave) {
        if (isSave) {
            this.save();
        } else {
            this.closeModal.emit(true);
        }
    }
}
