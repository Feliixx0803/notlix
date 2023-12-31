package com.notlix.back.controllers;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
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

import com.notlix.back.dtos.TaskDTO;
import com.notlix.back.models.Task;
import com.notlix.back.models.User;
import com.notlix.back.services.TaskService;
import com.notlix.back.services.UserService;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {
	private final TaskService taskService;
	private final UserService userService;

	@Autowired
	public TaskController(TaskService taskService, UserService userService) {
		this.taskService = taskService;
		this.userService = userService;
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Task>> findAllTasks(){
		List<Task> tasks = taskService.findAllTasks();
		return new ResponseEntity<>(tasks, HttpStatus.OK);
	}
	
	@PostMapping("/add/{email}")
	public ResponseEntity<String> addTask(
			@RequestBody TaskDTO newTaskData,
			@PathVariable String email
			){
		try {
			
			if (newTaskData.getName() == "") {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
				
			Task task = new Task();
			User user = userService.findUserByEmail(email);
			task.setUser(user);
			task.setName(newTaskData.getName());
			
			Task newTask = taskService.addTask(task);
			user.getTasks().add(newTask);
			userService.updateUser(user);
			
			return new ResponseEntity<String>("" + newTask.getId(),HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Task> updateTask(
			@RequestBody Task taskData,
			@PathVariable("id") Long id
			){
		Task task = taskService.findTaskById(id);
		task.setName(taskData.getName());
		task.setUser(taskData.getUser());
		
		Task taskUpdate = taskService.updateTask(task);
		
		return new ResponseEntity<>(taskUpdate, HttpStatus.OK);
	}
	
	@PutMapping("/updateState")
	public ResponseEntity<Task> updateTaskState(
			@RequestBody Long id
			){
		Task task = taskService.findTaskById(id);
		task.setDone(!task.isDone());
		System.out.println(task.isDone());
		
		Task taskUpdate = taskService.updateTask(task);
		
		return new ResponseEntity<>(taskUpdate, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteTask(
			@PathVariable("id") Long id
			){
		taskService.deleteTaskById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
