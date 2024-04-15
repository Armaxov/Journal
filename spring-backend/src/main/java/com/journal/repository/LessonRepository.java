package com.journal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.journal.entity.Lesson;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long>{

}
