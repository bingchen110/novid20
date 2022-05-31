export interface ChinaTotal {
	noInfectH5: number;
	localWzzAdd: number;
	nowLocalWzz: number;
	deadAdd: number;
	mediumRiskAreaNum: number;
	confirm: number;
	dead: number;
	noInfect: number;
	confirmAdd: number;
	mtime: string;
	localConfirm: number;
	suspect: number;
	showLocalConfirm: number;
	showlocalinfeciton: number;
	localConfirmAdd: number;
	importedCase: number;
	localConfirmH5: number;
	local_acc_confirm: number;
	nowConfirm: number;
	mRiskTime: string;
	heal: number;
	nowSevere: number;
	highRiskAreaNum: number;
}

export interface ChinaAdd {
	confirm: number;
	dead: number;
	nowConfirm: number;
	importedCase: number;
	heal: number;
	suspect: number;
	nowSevere: number;
	noInfect: number;
	localConfirm: number;
	noInfectH5: number;
	localConfirmH5: number;
}

export interface ShowAddSwitch {
	noInfect: boolean;
	all: boolean;
	confirm: boolean;
	suspect: boolean;
	dead: boolean;
	nowConfirm: boolean;
	nowSevere: boolean;
	importedCase: boolean;
	heal: boolean;
	localConfirm: boolean;
	localinfeciton: boolean;
}

export interface Total {
	wzz: number;
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirm: number;
	adcode: string;
	highRiskAreaNum: number;
	mtime: string;
	nowConfirm: number;
	confirm: number;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	dead: number;
	showRate: boolean;
	heal: number;
	showHeal: boolean;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	wzz_add: string;
	local_confirm_add: number;
}

export interface Children {
	total: Total;
	name: string;
	adcode: string;
	date: string;
	today: Today;
}

export interface Today {
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: string;
	local_confirm_add: number;
	abroad_confirm_add: number;
	dead_add: number;
	confirm: number;
}

export interface Total {
	nowConfirm: number;
	wzz: number;
	mediumRiskAreaNum: number;
	continueDayZeroConfirm: number;
	mtime: string;
	adcode: string;
	dead: number;
	showRate: boolean;
	heal: number;
	showHeal: boolean;
	highRiskAreaNum: number;
	confirm: number;
	provinceLocalConfirm: number;
	continueDayZeroConfirmAdd: number;
	continueDayZeroLocalConfirmAdd: number;
}

export interface Children {
	children: Children[];
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	showRate: boolean;
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	wzz: number;
	mediumRiskAreaNum: number;
	confirm: number;
	heal: number;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	nowConfirm: number;
	dead: number;
	showHeal: boolean;
	adcode: string;
}

export interface AreaTree {
	children: Children[];
	name: string;
	today: Today;
	total: Total;
}

export interface Diseaseh5Shelf {
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
}

export interface StatisGradeCityDetail {
	city: string;
	nowConfirm: number;
	confirmAdd: number;
	grade: string;
	sdate: string;
	wzz_add: string;
	province: string;
	confirm: number;
	dead: number;
	heal: number;
	date: string;
	mtime: string;
	syear: number;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}