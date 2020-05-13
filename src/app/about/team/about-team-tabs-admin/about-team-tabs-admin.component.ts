import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutTeamAdminService } from '../about-team-content-admin/about-team-admin.service';
import { IAboutTeamTabsSnippet } from '../../../../../serv-files/serv-modules/about/team-tabs-api/team-tabs.interfaces';

@Component({
    selector: 'app-about-team-tabs-admin',
    templateUrl: './about-team-tabs-admin.component.html',
    styleUrls: ['./about-team-tabs-admin.component.scss']
})
export class AboutTeamTabsAdminComponent implements OnInit {

    @Output()
    public closeModal = new EventEmitter<boolean>();
    @Output()
    public snippetChange = new EventEmitter();

    @Input()
    public snippet: IAboutTeamTabsSnippet;

    public form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public ref: ChangeDetectorRef,
        private teamService: AboutTeamAdminService
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
            switchOn: true,
            created_at : new Date(),
            last_modifyed : new Date(),
            team: this.formBuilder.array([])
        });
    }

    private setFormFromSnippet() {
        let teamTabs;
        if (this.snippet.team && this.snippet.team.length) {
            teamTabs = this.formBuilder.array(this.snippet.team.map((tab) => this.formBuilder.group({name: tab.name, show: tab.show})));
        } else {
            teamTabs = this.formBuilder.array([]);
        }

        this.form = this.formBuilder.group({
            switchOn: this.snippet.switchOn,
            created_at : this.snippet.created_at,
            last_modifyed : new Date(),
            team: teamTabs
        });
    }

    public pushTab() {
        (this.form.controls.team as FormArray).push(this.formBuilder.group( {name: ['', Validators.required], show: true}));
    }

    public popTab(i) {
        (this.form.controls.team as FormArray).removeAt(i);
    }

    public save() {
        this.teamService.setTabsSnippetData(this.form.value).subscribe(
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
