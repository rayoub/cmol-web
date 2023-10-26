package edu.cmol.web.api;

public enum IonReport {
	Undefined(0),
	CnvStats(1);
	
	private int id;

	IonReport(int id) {
		this.id = id;
	}

	public int getId() {
		return id;
	}

	public static IonReport fromId(int id) {

		if (id == 1) {
			return CnvStats;
		}
		else {
			return Undefined;
		}
	}
}