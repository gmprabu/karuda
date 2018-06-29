package com.karuda.model;

import java.util.Date;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class StockUpdateRequest {

	@NotBlank
	private long id;

	@NotBlank
	private Date date;

	@NotBlank
	private int stock;
}
