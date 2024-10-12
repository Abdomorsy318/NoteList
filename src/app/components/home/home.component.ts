import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NoteService } from '../../core/services/note.service';
import { AllNotes } from '../../core/interfaces/all-notes';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
declare var $:any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule , NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
private readonly _NoteService = inject(NoteService);
noteList:WritableSignal<AllNotes[]> = signal([]);
newNote = {
  title:'',
  content:''
};
checkAdd:WritableSignal<boolean> = signal(false);
checkDelete:WritableSignal<boolean> = signal(false);
loadContent:WritableSignal<boolean> = signal(false);
changeTitle!:number;
idNote:WritableSignal<string> = signal('');
notFoundMsg:WritableSignal<string> = signal('');
ngOnInit(): void {
  this.loadContent.set(true);
  this.getAllNotes();
      
}

getAllNotes():void{
  this._NoteService.getUserNotes().subscribe({
    next:(res)=>{
      this.noteList.set(res.notes);
      this.loadContent.set(false);
    },
    error:(err)=>{
      this.noteList().length = 0;
      this.loadContent.set(false);
      this.notFoundMsg.set(err.error.msg);
    }
  })
}

addNote():void{
 if(this.newNote.title !== '' || this.newNote.content !== '')
 {
  this.checkAdd.set(true)
  this._NoteService.addNote(this.newNote).subscribe({
    next:()=>{
      this.getAllNotes();
      this.newNote.title = '';
      this.newNote.content = '';
      this.checkAdd.set(false);
      $('#exampleModal').modal('hide');
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    },
    error:(err)=>{
      console.log(err);
      this.checkAdd.set(false);
    }
  })
 }
}

showAdd():void{
  this.changeTitle = 1;
  this.newNote.title = '';
  this.newNote.content = '';
}

showEdit(note:AllNotes):void{
  this.changeTitle = 0;
  this.newNote.title = note.title;
  this.newNote.content = note.content;
  this.idNote.set(note._id);
}

editNote():void{
  this.checkAdd.set(true)
  this._NoteService.updateNote(this.idNote() , this.newNote).subscribe({
    next:(res)=>{
      this.newNote.title = res.note.title;
      this.newNote.content = res.note.content;
      this.getAllNotes();
      this.checkAdd.set(false);
      $('#exampleModal').modal('hide');
    },
    error:(err)=>{
      console.log(err);
      this.checkAdd.set(false);
    }
  })
}
deleteNote(id:string):void{
  this.checkDelete.set(true);
  this._NoteService.deleteNote(id).subscribe({
    next:()=>{
      this.getAllNotes()
      this.checkDelete.set(false);
    },
    error:(err)=>{
      console.log(err);
      
      this.checkDelete.set(false);
    }
  })
}
}
