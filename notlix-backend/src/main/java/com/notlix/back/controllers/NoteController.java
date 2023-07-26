package com.notlix.back.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;import org.springframework.core.task.TaskDecorator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notlix.back.models.Note;
import com.notlix.back.models.Task;
import com.notlix.back.models.User;
import com.notlix.back.services.NoteService;
import com.notlix.back.services.UserService;

@RestController
@RequestMapping("/note")
@CrossOrigin(origins = "http://localhost:4200")
public class NoteController {
	private final NoteService noteService;
	private final UserService userService;
	
	@Autowired
	public NoteController(NoteService noteService, UserService userService) {
		this.noteService = noteService;
		this.userService = userService;
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Note>> findAllNotes(){
		List<Note> notes = noteService.findAllNotes();
		return new ResponseEntity<>(notes,HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<String> addNote(
			@RequestBody Note noteData
			){
		try {
			Note note = new Note();
			User user = userService.findUserById(noteData.getUser().getId());
			
			note.setTitle(noteData.getTitle());
			note.setContent(noteData.getContent());
			note.setUser(user);
			
			Note newNote = noteService.addNote(note);
			return new ResponseEntity<String>("" + newNote,HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
		
	@PutMapping("/update/{id}")
	public ResponseEntity<Note> updateNote(
			@RequestBody Note noteData,
			@PathVariable("id") Long id
			){
		Note note = noteService.findNoteById(id);
		note.setContent(noteData.getContent());
		note.setTitle(noteData.getTitle());
		
		Note noteUpdate = noteService.updateNote(note);
		return new ResponseEntity<>(noteUpdate, HttpStatus.OK);
	}
	
	@GetMapping("/find/{id}")
	public ResponseEntity<Note> findNoteById(
			@PathVariable("id") Long id
			){
		Note note = noteService.findNoteById(id);
		return new ResponseEntity<Note> (note, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteNote(
			@PathVariable("id") Long id
			){
		noteService.deleteNoteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
