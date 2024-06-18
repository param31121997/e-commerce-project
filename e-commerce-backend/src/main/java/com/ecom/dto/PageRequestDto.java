package com.ecom.dto;


import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Objects;

import org.springframework.data.domain.PageRequest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageRequestDto {

	private Integer pageNo = 0;
	private Integer pageSize = 10;
	private Sort.Direction sort = Sort.Direction.ASC;
	private String sortByColumn ="id";
	
	
	public Pageable getPageable(PageRequestDto dto) {
		Integer pageNo = Objects.nonNull(dto.getPageNo())? dto.getPageNo():this.pageNo;
		Integer pageSize = Objects.nonNull(dto.getPageNo())? dto.getPageSize():this.pageSize;
		Sort.Direction sort = Objects.nonNull(dto.getSort())? dto.getSort():this.sort;
		String  sortByColumn = Objects.nonNull(dto.getSort())? dto.getSortByColumn():this.sortByColumn;


		
//		PageRequest pageRequest =  PageRequest.of(pageNo, pageSize);
		PageRequest pageRequest =  PageRequest.of(pageNo, pageSize, sort, sortByColumn);

		return pageRequest;
	}
	
}
