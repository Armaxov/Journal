package com.journal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.journal.entity.LessonLibrary;

@Repository
public interface LessonLibraryRepository extends JpaRepository<LessonLibrary, Long>{

}
