package com.notlix.back.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notlix.back.models.Note;
import com.notlix.back.repositories.NoteRepo;

@Service
public class NoteService {
	private final NoteRepo noteRepo;

	@Autowired
	public NoteService(NoteRepo noteRepo) {
		this.noteRepo = noteRepo;
	}

	
	public Note addNote(Note note) {
		return noteRepo.save(note);
	}
	
	public List<Note> findAllNotes(){
		return noteRepo.findAll();
	}

	public Note updateNote(Note note) {
		return noteRepo.save(note);
	}
	
	public Note findNoteById(Long id) {
		return noteRepo.findNoteById(id);
	}
	
	public void deleteNoteById(Long id) {
		noteRepo.deleteById(id);
	}


	public Note findNoteByTitle(String title) {
		return noteRepo.findNoteByTitle(title);
	}


}
