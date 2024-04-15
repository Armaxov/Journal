package com.journal.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.journal.entity.LessonLibrary;
import com.journal.repository.LessonLibraryRepository;

@Service
public class LessonLibraryServiceImpl implements LessonLibraryService{

	private final LessonLibraryRepository lessonLibraryRepository;
	
	@Autowired
	public LessonLibraryServiceImpl(LessonLibraryRepository lessonLibraryRepository) {
		this.lessonLibraryRepository = lessonLibraryRepository;
	}
	
	@Override
	public List<LessonLibrary> getLessonLibraries() {
		return lessonLibraryRepository.findAll();
	}

	@Override
	public List<LessonLibrary> getLessonLibrariesByUserId(Long userId) {
		ArrayList<LessonLibrary> lessonLibrary = (ArrayList<LessonLibrary>) getLessonLibraries();
		ArrayList<LessonLibrary> result = new ArrayList<LessonLibrary>();
		
		for (LessonLibrary library : lessonLibrary) {
			if(library.getUserId().equals(userId))
				result.add(library);
		}
		return result;
	}

	@Override
	public LessonLibrary getLessonLibraryById(Long id) {
		return lessonLibraryRepository.findById(id).get();
	}

	@Override
	public LessonLibrary updateLessonLibraryById(Long id, LessonLibrary lessonLibrary) {
		LessonLibrary findedLibrary = lessonLibraryRepository.findById(id).get();
		findedLibrary.setLessonLibrary(lessonLibrary);
		return lessonLibraryRepository.save(findedLibrary);
	}

	@Override
	public void deleteLessonLibrary(Long id) {
		lessonLibraryRepository.deleteById(id);
	}

	@Override
	public LessonLibrary saveLessonLibrary(LessonLibrary lessonLibrary) {
		return lessonLibraryRepository.save(lessonLibrary);
	}

}
