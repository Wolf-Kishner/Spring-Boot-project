package com.example.demo.controller;

import com.example.demo.model.Task;
import com.example.demo.service.TaskService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api")
public class TaskController  {

    @Autowired
    TaskService service;

    @PostMapping("/")
    public ResponseEntity<String> greet() {
        return new ResponseEntity<>("Hello", HttpStatus.OK);
    }
    //We are able to query the List Items from the DB
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> list = service.getAllTasks().getBody();
      return new ResponseEntity<>(list,HttpStatus.OK);
    }

    //I want to include the Data in the Headers now so we Use that Request Part thing
    @PostMapping("/add")
    public ResponseEntity<Task> addTask(@RequestBody Task t) {
        Task newTask = service.addTask(t).getBody();
        return new ResponseEntity<>(newTask, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String>updateTask(@PathVariable int id, @RequestBody Task t) {
        Task newTask = service.updateTask(id,t);
        if(newTask != null) {
            return new ResponseEntity<>("Updated Successfully",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Error in Updating",HttpStatus.BAD_GATEWAY);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable int id) {
        service.deleteTask(id);
        return new ResponseEntity<>("Deleted Successfully",HttpStatus.OK);
    }
}