package com.example.demo.Repo;

import com.example.demo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepo  extends JpaRepository<Task,Integer> {
}
