package com.example.demo.service;

import com.example.demo.Repo.TaskRepo;
import com.example.demo.model.Task;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TaskService {
    @Autowired
    TaskRepo repo;

    public ResponseEntity<List<Task>> getAllTasks() {
        return new ResponseEntity<>(repo.findAll(), HttpStatus.OK);
   }
    //Service has to interact with the DATA BASE TO add te TASK

    public ResponseEntity<Task> addTask(Task t) {
        Task newTask = repo.save(t);
        return  new ResponseEntity<>(newTask, HttpStatus.OK);
    }

    public Task updateTask(int id, Task t) {
        Task existingTask = repo.findById(id).orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        existingTask.setText(t.getText());
        existingTask.setStatus(t.getStatus());
        return repo.save(existingTask);
    }

    public void deleteTask(int id) {
        repo.deleteById(id);
    }
}
