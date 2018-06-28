package com.karuda.domain;


import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.karuda.domain.audit.UserAudit;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
public class StockAudit  extends UserAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private int quantity;
	
	@ManyToOne(cascade = CascadeType.ALL)
	Product product;
}
