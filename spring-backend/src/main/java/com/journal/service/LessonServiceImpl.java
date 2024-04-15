package com.journal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import com.journal.entity.Lesson;
import com.journal.repository.LessonRepository;

@Service
public class LessonServiceImpl implements LessonService{


	private final LessonRepository lessonRepository;
	
	@Autowired
	public LessonServiceImpl(LessonRepository lessonRepository) {
		this.lessonRepository = lessonRepository;
	}
	
	@Override
	public List<Lesson> getAllLessons() {
		return lessonRepository.findAll();
	}

	@Override
	public Lesson getLessonById(Long id) {
		Lesson Lesson = lessonRepository.findById(id)
				.orElseThrow(() -> new ResourceAccessException("Lesson is not exist with id:" + id));
		return Lesson;
	}

	@Override
	public Lesson saveLesson(Lesson Lesson) {
		return lessonRepository.save(Lesson);
	}

	@Override
	public void deleteLessonById(Long id) {
		Lesson Lesson = getLessonById(id);
		lessonRepository.delete(Lesson);
	}

	@Override
	public Lesson updateLessonById(Long id, Lesson newLesson) {
		Lesson Lesson = getLessonById(id);
		Lesson.changeLessonData(newLesson);
		return lessonRepository.save(Lesson);
	}

	
}
