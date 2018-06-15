package com.karuda.domain;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class OrderList {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@Column
	private int quantity;
	
	@Column
	private double price;
	
	
	@ManyToOne(cascade = CascadeType.ALL)
	Order order;
	
	@ManyToOne(cascade = CascadeType.ALL)
	Product product;
}
