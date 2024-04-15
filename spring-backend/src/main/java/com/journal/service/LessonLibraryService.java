package com.journal.service;

import java.util.List;

import com.journal.entity.LessonLibrary;

public interface LessonLibraryService {

	List<LessonLibrary> getLessonLibraries();
	
	List<LessonLibrary> getLessonLibrariesByUserId(Long userId);
	
	LessonLibrary getLessonLibraryById(Long id);
	
	LessonLibrary saveLessonLibrary(LessonLibrary lessonLibrary);
	
	LessonLibrary updateLessonLibraryById(Long id, LessonLibrary lessonLibrary);
	
	void deleteLessonLibrary(Long id);
}
