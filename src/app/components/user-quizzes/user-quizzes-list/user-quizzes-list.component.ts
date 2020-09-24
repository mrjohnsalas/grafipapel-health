import { Component, OnInit } from '@angular/core';
import { UserQuiz } from '@models/user-quiz';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppSettingsService } from '@services/app-settings.service';
import { UserQuizzesService } from '@services/user-quizzes.service';
import { UserQuizzesDetailComponent } from '@components/user-quizzes/user-quizzes-detail/user-quizzes-detail.component';

@Component({
  selector: 'app-user-quizzes-list',
  templateUrl: './user-quizzes-list.component.html',
  styleUrls: ['./user-quizzes-list.component.css']
})
export class UserQuizzesListComponent implements OnInit {

  userQuizzes: UserQuiz[] = [];
  isLoadingData = false;
  dtOptions: any = {
    info: true,
    lengthChange: false,
    processing: true,
    searching: false,
    responsive: true,
    pagingType: 'full_numbers',
    pageLength: 15,
    dom: '<"html5buttons"B>lftip',
    buttons: [
      { extend: 'copy', className: 'btn-sm' },
      { extend: 'csv', title: 'Lista de registros', className: 'btn-sm' },
      { extend: 'excel', title: 'Lista de registros', className: 'btn-sm' },
      { extend: 'pdf', title: 'Lista de registros', className: 'btn-sm' },
      { extend: 'print', title: 'Lista de registros', className: 'btn-sm',
        customize(win): void {
              $(win.document.body).addClass('white-bg');
              $(win.document.body).css('font-size', '10px');
              $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
        }
      }
    ],
    language: {
      emptyTable: 'No hay datos disponibles',
      info: 'Mostrando desde _START_ hasta _END_ de _TOTAL_ registros',
      infoEmpty: 'Mostrando desde 0 hasta 0 de 0 registros',
      loadingRecords: 'Cargando...',
      processing: 'Procesando...',
      paginate: {
        first: 'Ini.',
        last: 'Fin',
        next: 'Sig.',
        previous: 'Ant.'
      }
    },
    columnDefs: [
      { targets: 0, responsivePriority: 10001 },
      { targets: 1, responsivePriority: 1 },
      { targets: 2, orderable: false, responsivePriority: 2 }
    ]
  };

  constructor(private modalService: NgbModal, public appSettingsService: AppSettingsService, private userQuizzesService: UserQuizzesService) { }

  ngOnInit(): void {
    this.loadUserQuizzes();
  }

  view(userQuiz: UserQuiz): void {
    const modalForm = this.modalService.open(UserQuizzesDetailComponent);
    modalForm.result.then(
      this.onCloseModalForm.bind(this),
      this.onCloseModalForm.bind(this)
    );
    modalForm.componentInstance.employeeSelected = userQuiz;
  }

  delete(id: string, index: number): void {
    this.userQuizzesService.delete(id)
      .then(() => {
        this.userQuizzes.splice(index, 1);
      })
      .catch(error => {
        console.error(error);
      });
  }

  onCloseModalForm(response: any): void {
    if (response === Object(response)) {
      if (response.createMode) {
        response.userQuiz.id = response.id;
        this.userQuizzes.unshift(response.userQuiz);
      } else {
        const index = this.userQuizzes.findIndex(x => x.id == response.id);
        this.userQuizzes[index] = response.userQuiz;
      }
    }
  }

  loadUserQuizzes(date?: string): void {
    this.isLoadingData = true;
    let dateX = new Date();
    if (date !== undefined) {
      const dateArray = date.split('-');
      dateX = new Date(`${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`);
    }
    this.userQuizzesService.getByDate(dateX).subscribe(
      collection => {
        this.userQuizzes = [];
        collection.docs.forEach(doc => {
          const userQuiz = this.userQuizzesService.setUserQuiz(doc.id, doc.data());
          this.userQuizzes.push(userQuiz);
        });
      },
      error => {
        console.error(error);
      },
      () => {
        this.isLoadingData = false;
      });
  }

}
