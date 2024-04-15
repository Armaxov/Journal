package com.journal.service;

import java.util.List;

import com.journal.entity.Lesson;

public interface LessonService {

	List<Lesson> getAllLessons();
	
	Lesson getLessonById(Long id);
	
	Lesson saveLesson(Lesson Lesson);
	
	void deleteLessonById(Long id);
	
	Lesson updateLessonById(Long id, Lesson newLesson);
}
