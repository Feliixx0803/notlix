/**
 * 
 */
package com.notlix.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notlix.back.models.Note;

/**
 * 
 */
public interface NoteRepo extends JpaRepository<Note, Long> {
	Note findNoteById(Long id);
}
