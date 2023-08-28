package com.notlix.back.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notlix.back.models.Task;
import com.notlix.back.repositories.TaskRepo;

@Service
public class TaskService {

	private final TaskRepo taskRepo;
	
	@Autowired
	public TaskService(TaskRepo taskRepo) {
		this.taskRepo = taskRepo;
	}
	
	public Task addTask(Task task) {
		return taskRepo.save(task);
	}
	
	public List<Task> findAllTasks(){
		return taskRepo.findAll();
	}

	public Task updateTask(Task task) {
		return taskRepo.save(task);
	}
	
	public Task findTaskById(Long id) {
		return taskRepo.findTaskById(id);
	}
	
	public void deleteTaskById(Long id) {
		taskRepo.deleteById(id);
	}

	public Task findTaskByName(String name) {
		return taskRepo.findTaskByName(name);
	}
}
