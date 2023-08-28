package com.notlix.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notlix.back.models.Task;

public interface TaskRepo extends JpaRepository<Task, Long> {
	Task findTaskById(Long id);
	Task findTaskByName(String name);
}
