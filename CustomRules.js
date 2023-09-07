import System;
import System.Windows.Forms;
import Fiddler;
import System.Threading;

// INTRODUCTION
//
// Well, hello there!
//
// Don't be scared! :-)
//
// This is the FiddlerScript Rules file, which creates some of the menu commands and
// other features of Fiddler. You can edit this file to modify or add new commands.
//
// The original version of this file is named SampleRules.js and it is in the
// \Program Files\Fiddler\ folder. When Fiddler first runs, it creates a copy named
// CustomRules.js inside your \Documents\Fiddler2\Scripts folder. If you make a 
// mistake in editing this file, simply delete the CustomRules.js file and restart
// Fiddler. A fresh copy of the default rules will be created from the original
// sample rules file.

// The best way to edit this file is to install the FiddlerScript Editor, part of
// the free SyntaxEditing addons. Get it here: http://fiddler2.com/r/?SYNTAXVIEWINSTALL

// GLOBALIZATION NOTE: Save this file using UTF-8 Encoding.

// JScript.NET Reference
// http://fiddler2.com/r/?msdnjsnet
//
// FiddlerScript Reference
// http://fiddler2.com/r/?fiddlerscriptcookbook

class Handlers
{//11
	static var answerId: String;
	static var wrongAnswer: String;
	static var aws: String;
	
	static	function FaceValues(hand) {
		var card_order_dict = {2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", T:"10",J:"11", Q:"12", K:"13", A:"14"};
		var values = [];
		for (var i = 0; i < hand.length; i++){
			values.push(card_order_dict[hand[i].substring(0,1)]);
		}
		return(values);
	}
	
	static	function FaceSuit(x, y) {
		return(aws.substring((x/55+y/68*9),(x/55+y/68*9)+1));
	}
	
	static function getPermutations(array, size) {
		function p(t, i) {
			if (t.length === size) {
				result.push(t);
				return;
			}
			if (i + 1 > array.length) {
				return;
			}
			p(t.concat(array[i]), i + 1);
			p(t, i + 1);
		}

		var result = [];
		p([], 0);
		return(result);
	}
	
	static function onlyUnique(arr) {
		var arrFiltered = [];
		for (var i = 0; i < arr.length; i++){
			if (arrFiltered.join("").search(arr[i]) == -1) {
				arrFiltered.push(arr[i]);
			}
		}
		return(arrFiltered);
	}
	
	static function value_counts(arr) {
		var card_order_dict = {2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", T:"10",J:"11", Q:"12", K:"13", A:"14"};
		var counts, values, count;
		counts = {};
		values = onlyUnique(arr);
		for (var i = 0; i < values.length; i++){
			count = 0;
			for (var j = 0; j < arr.length; j++){
				if (arr[j] == values[i]) {
					count += 1;
				}
			}
			counts[card_order_dict[values[i]]] = count;
		}
		return(counts);
	}
	
	static function getKeyByValue(object, value) {
		var key;
		for (key in object){
			if(object[key] == value){
				return(key);
			}
		}
	}
	
	static function object_values(object) {
		var key, result;
		result = []
		for (key in object){
			result.push(object[key]);
		}
		return(result);
	}
	
	static function check_flush(hand) {
		var suits = [];
		for (var i = 0; i < hand.length; i++){
			suits.push(hand[i].substring(1,2));
		}

		var unique = onlyUnique(suits);
		if((unique.join("")).length == 1){
			return true;
		}else{
			return false;
		}
	}
	
	static function check_straight(hand) {
		var values = [];
		for (var i = 0; i < hand.length; i++){
			values.push(hand[i].substring(0,1));
		}
		var value_range = Math.max.apply(null, FaceValues(values)) - Math.min.apply(null, FaceValues(values));

		if(onlyUnique(values).length == 5 && value_range == 4){
			return true;
		}else if(values.sort().join("") == '2345A'){
			return true;
		}else{
			return false;
		}
	}
	
	static function check_straight_flush(hand) {
		if (check_flush(hand) && check_straight(hand)){
			return true;
		}else{
			return false;
		}
	}
	
	static function check_four_of_a_kind(hand) {
		var values = [];
		for (var i = 0; i < hand.length; i++){
			values.push(hand[i].substring(0,1));
		}

		var counts = value_counts(values);
		if((object_values(counts)).sort().join("") == '14'){
			return true;
		}else{
			return false;
		}
	}
	
	static function check_full_house(hand) {
		var values = [];
		for (var i = 0; i < hand.length; i++){
			values.push(hand[i].substring(0,1));
		}

		var counts = value_counts(values);
		if((object_values(counts)).sort().join("") == '23'){
			return true;
		}else{
			return false;
		}
	}
	
	static function check_three_of_a_kind(hand) {
		var values = [];
		for (var i = 0; i < hand.length; i++){
			values.push(hand[i].substring(0,1));
		}

		var counts = value_counts(values);
		if((object_values(counts)).sort().join("") == '113'){
			return true;
		}else{
			return false;
		}
	}
	
	static function check_two_pairs(hand) {
		var values = [];
		for (var i = 0; i < hand.length; i++){
			values.push(hand[i].substring(0,1));
		}

		var counts = value_counts(values);
		if((object_values(counts)).sort().join("") == '122'){
			return true;
		}else{
			return false;
		}
	}
	
	static function check_one_pairs(hand) {
		var values = [];
		for (var i = 0; i < hand.length; i++){
			values.push(hand[i].substring(0,1));
		}

		var counts = value_counts(values);
		if((object_values(counts)).sort().join("") == '1112'){
			return true;
		}else{
			return false;
		}
	}
	
	static function check_hand(hand){
		if (check_straight_flush(hand)){
			return(9);
		}else if(check_four_of_a_kind(hand)){
			return(8);
		}else if(check_full_house(hand)){
			return(7);
		}else if(check_flush(hand)){
			return(6);
		}else if(check_straight(hand)){
			return(5);
		}else if(check_three_of_a_kind(hand)){
			return(4);
		}else if(check_two_pairs(hand)){
			return(3);
		}else if(check_one_pairs(hand)){
			return(2);
		}else{
			return(1);
		}
	}
	
	static function play(hand){
		
		var card_order_dict = {2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", T:"10",J:"11", Q:"12", K:"13", A:"14"};
		var cards, best_value, best_hand, hand_value;
		cards = getPermutations(hand, 5);
		best_value = 0;
		best_hand = [];
		for (var i = 0; i < cards.length; i++){
			hand_value = check_hand(cards[i]);
			if (hand_value > best_value){
				best_value = hand_value;
				best_hand = cards[i];
			}else if(hand_value == best_value){
				if(comparator(cards[i]) > comparator(best_hand)){
					best_hand = cards[i];
				}
			}
		}
		return(best_hand);
	}
	
	static function comparator(best_hand){
		var card_order_dict = {2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", T:"10",J:"11", Q:"12", K:"13", A:"14"};
		var values = [];
		for (var i = 0; i < best_hand.length; i++){
			values.push(best_hand[i].substring(0,1));
		}
		var counts = value_counts(values.sort(function(a, b){return card_order_dict[a]-card_order_dict[b]}));

		if (check_hand(best_hand) == 9){
			if(values.sort().join("") == '2345A'){
				return(5);
			}else{
				return(Math.max.apply(null, FaceValues(values)));
			}
		}else if (check_hand(best_hand) == 8){
			return(getKeyByValue(counts, 1));
		}else if (check_hand(best_hand) == 7){
			var full_house = +getKeyByValue(counts, 3) * 13 + +getKeyByValue(counts, 2);
			return(full_house);
		}else if (check_hand(best_hand) == 6){
			var sortedValue = FaceValues(values).sort(function(a, b){return a-b});
			var flush = +sortedValue[0] + +sortedValue[1] * 13 + +sortedValue[2] * 13 * 13 + +sortedValue[3] * 13 * 13 * 13 + +sortedValue[4] * 13 * 13 * 13 * 13;
			return(flush);
		}else if (check_hand(best_hand) == 5){
			if(values.sort().join("") == '2345A'){
				return(5);
			}else{
				return(Math.max.apply(null, FaceValues(values)));
			}
		}else if (check_hand(best_hand) == 4){
			var three_of_a_kind;
			three_of_a_kind = +getKeyByValue(counts, 3) * 13 * 13;
			three_of_a_kind += +getKeyByValue(counts, 1);
			delete counts[getKeyByValue(counts, 1)];
			three_of_a_kind += +getKeyByValue(counts, 1) * 13;
			return(three_of_a_kind);
		}else if (check_hand(best_hand) == 3){
			var two_pairs;
			two_pairs = +getKeyByValue(counts, 2) * 13;
			delete counts[getKeyByValue(counts, 2)];
			two_pairs += +getKeyByValue(counts, 2) * 13 * 13;
			two_pairs += +getKeyByValue(counts, 1);
			return(two_pairs);
		}else if (check_hand(best_hand) == 2){
			var one_pairs;
			one_pairs = +getKeyByValue(counts, 2) * 13 * 13 * 13;
			one_pairs += +getKeyByValue(counts, 1);
			delete counts[getKeyByValue(counts, 1)];
			one_pairs += +getKeyByValue(counts, 1) * 13;
			delete counts[getKeyByValue(counts, 1)];
			one_pairs += +getKeyByValue(counts, 1) * 13 * 13;
			return(one_pairs);
		}else if (check_hand(best_hand) == 1){
			var sortedValue = FaceValues(values).sort(function(a, b){return a-b});
			var high = +sortedValue[0] + +sortedValue[1] * 13 + +sortedValue[2] * 13 * 13 + +sortedValue[3] * 13 * 13 * 13 + +sortedValue[4] * 13 * 13 * 13 * 13;
			return(high);
		}
	}
	// *****************
	//
	// This is the Handlers class. Pretty much everything you ever add to FiddlerScript
	// belongs right inside here, or inside one of the already-existing functions below.
	//
	// *****************

	// The following snippet demonstrates a custom-bound column for the Web Sessions list.
	// See http://fiddler2.com/r/?fiddlercolumns for more info
	/*
	public static BindUIColumn("Method", 60)
	function FillMethodColumn(oS: Session): String {
	return oS.RequestMethod;
	}
	*/

	// The following snippet demonstrates how to create a custom tab that shows simple text
	/*
	public BindUITab("Flags")
	static function FlagsReport(arrSess: Session[]):String {
	var oSB: System.Text.StringBuilder = new System.Text.StringBuilder();
	for (var i:int = 0; i<arrSess.Length; i++)
	{
	oSB.AppendLine("SESSION FLAGS");
	oSB.AppendFormat("{0}: {1}\n", arrSess[i].id, arrSess[i].fullUrl);
	for(var sFlag in arrSess[i].oFlags)
	{
	oSB.AppendFormat("\t{0}:\t\t{1}\n", sFlag.Key, sFlag.Value);
	}
	}
	return oSB.ToString();
	}
	*/

	// You can create a custom menu like so:
	/*
	QuickLinkMenu("&Links") 
	QuickLinkItem("IE GeoLoc TestDrive", "http://ie.microsoft.com/testdrive/HTML5/Geolocation/Default.html")
	QuickLinkItem("FiddlerCore", "http://fiddler2.com/fiddlercore")
	public static function DoLinksMenu(sText: String, sAction: String)
	{
	Utilities.LaunchHyperlink(sAction);
	}
	*/

	public static RulesOption("Hide 304s")
	BindPref("fiddlerscript.rules.Hide304s")
	var m_Hide304s: boolean = false;

	// Cause Fiddler to override the Accept-Language header with one of the defined values
	public static RulesOption("Request &Japanese Content")
	var m_Japanese: boolean = false;

	// Automatic Authentication
	public static RulesOption("&Automatically Authenticate")
	BindPref("fiddlerscript.rules.AutoAuth")
	var m_AutoAuth: boolean = false;

	// Cause Fiddler to override the User-Agent header with one of the defined values
	// The page http://browserscope2.org/browse?category=selectors&ua=Mobile%20Safari is a good place to find updated versions of these
	RulesString("&User-Agents", true) 
	BindPref("fiddlerscript.ephemeral.UserAgentString")
	RulesStringValue(0,"Netscape &3", "Mozilla/3.0 (Win95; I)")
	RulesStringValue(1,"WinPhone8.1", "Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 520) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537")
	RulesStringValue(2,"&Safari5 (Win7)", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1")
	RulesStringValue(3,"Safari9 (Mac)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11) AppleWebKit/601.1.56 (KHTML, like Gecko) Version/9.0 Safari/601.1.56")
	RulesStringValue(4,"iPad", "Mozilla/5.0 (iPad; CPU OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F5027d Safari/600.1.4")
	RulesStringValue(5,"iPhone6", "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4")
	RulesStringValue(6,"IE &6 (XPSP2)", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)")
	RulesStringValue(7,"IE &7 (Vista)", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1)")
	RulesStringValue(8,"IE 8 (Win2k3 x64)", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; WOW64; Trident/4.0)")
	RulesStringValue(9,"IE &8 (Win7)", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)")
	RulesStringValue(10,"IE 9 (Win7)", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)")
	RulesStringValue(11,"IE 10 (Win8)", "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)")
	RulesStringValue(12,"IE 11 (Surface2)", "Mozilla/5.0 (Windows NT 6.3; ARM; Trident/7.0; Touch; rv:11.0) like Gecko")
	RulesStringValue(13,"IE 11 (Win8.1)", "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko")
	RulesStringValue(14,"Edge (Win10)", "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.11082")
	RulesStringValue(15,"&Opera", "Opera/9.80 (Windows NT 6.2; WOW64) Presto/2.12.388 Version/12.17")
	RulesStringValue(16,"&Firefox 3.6", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.7) Gecko/20100625 Firefox/3.6.7")
	RulesStringValue(17,"&Firefox 43", "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0")
	RulesStringValue(18,"&Firefox Phone", "Mozilla/5.0 (Mobile; rv:18.0) Gecko/18.0 Firefox/18.0")
	RulesStringValue(19,"&Firefox (Mac)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0")
	RulesStringValue(20,"Chrome (Win)", "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.48 Safari/537.36")
	RulesStringValue(21,"Chrome (Android)", "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36")
	RulesStringValue(22,"ChromeBook", "Mozilla/5.0 (X11; CrOS x86_64 6680.52.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.74 Safari/537.36")
	RulesStringValue(23,"GoogleBot Crawler", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)")
	RulesStringValue(24,"Kindle Fire (Silk)", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.0.22.79_10013310) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true")
	RulesStringValue(25,"&Custom...", "%CUSTOM%")
	public static var sUA: String = null;

	// Cause Fiddler to delay HTTP traffic to simulate typical 56k modem conditions
	public static RulesOption("Simulate &Modem Speeds", "Per&formance")
	var m_SimulateModem: boolean = false;

	// Removes HTTP-caching related headers and specifies "no-cache" on requests and responses
	public static RulesOption("&Disable Caching", "Per&formance")
	var m_DisableCaching: boolean = false;

	public static RulesOption("Cache Always &Fresh", "Per&formance")
	var m_AlwaysFresh: boolean = false;
        
	// Force a manual reload of the script file.  Resets all
	// RulesOption variables to their defaults.
	public static ToolsAction("Reset Script")
	function DoManualReload() { 
		FiddlerObject.ReloadScript();
	}

	public static ContextAction("Decode Selected Sessions")
	function DoRemoveEncoding(oSessions: Session[]) {
		for (var x:int = 0; x < oSessions.Length; x++){
			oSessions[x].utilDecodeRequest();
			oSessions[x].utilDecodeResponse();
		}
		UI.actUpdateInspector(true,true);
	}

	static function OnBeforeRequest(oSession: Session) {
		// Break requests based on target hostname and path.
		var type1 = "\"requestType\":\"145\"";
		var type2 = "\"requestType\":\"32\"";
		var type3 = "\"requestType\":\"139\"";
		var index1 = (oSession.PathAndQuery.indexOf("/dailyblitz") > -1 );
		var index2 = (oSession.PathAndQuery.indexOf("/wsop-dailyblitz-service/public/dailyblitz/answer") > -1 );
		var index3 = (oSession.PathAndQuery.indexOf("/buddy/friendinvite") > -1 );

		if(oSession.host == "wsop-prod.wsop.playtika.com"){
			var strBody = oSession.GetRequestBodyAsString();
			if (index1) {
				if (strBody.search(type1) > -1 || index2) {
					if (strBody.search(wrongAnswer) > -1) {
						strBody = strBody.replace(wrongAnswer, answerId);
						oSession.utilSetRequestBody(strBody);
					}
				}
			}
		}

		// Sample Rule: Color ASPX requests in RED
		// if (oSession.uriContains(".aspx")) {	oSession["ui-color"] = "red";	}

		// Sample Rule: Flag POSTs to fiddler2.com in italics
		// if (oSession.HostnameIs("www.fiddler2.com") && oSession.HTTPMethodIs("POST")) {	oSession["ui-italic"] = "yup";	}

		// Sample Rule: Break requests for URLs containing "/sandbox/"
		// if (oSession.uriContains("/sandbox/")) {
		//     oSession.oFlags["x-breakrequest"] = "yup";	// Existence of the x-breakrequest flag creates a breakpoint; the "yup" value is unimportant.
		// }

		if ((null != gs_ReplaceToken) && (oSession.url.indexOf(gs_ReplaceToken)>-1)) {   // Case sensitive
			oSession.url = oSession.url.Replace(gs_ReplaceToken, gs_ReplaceTokenWith); 
		}
		if ((null != gs_OverridenHost) && (oSession.host.toLowerCase() == gs_OverridenHost)) {
			oSession["x-overridehost"] = gs_OverrideHostWith; 
		}

		if ((null!=bpRequestURI) && oSession.uriContains(bpRequestURI)) {
			oSession["x-breakrequest"]="uri";
		}

		if ((null!=bpMethod) && (oSession.HTTPMethodIs(bpMethod))) {
			oSession["x-breakrequest"]="method";
		}

		if ((null!=uiBoldURI) && oSession.uriContains(uiBoldURI)) {
			oSession["ui-bold"]="QuickExec";
		}

		if (m_SimulateModem) {
			// Delay sends by 300ms per KB uploaded.
			oSession["request-trickle-delay"] = "300"; 
			// Delay receives by 150ms per KB downloaded.
			oSession["response-trickle-delay"] = "150"; 
		}

		if (m_DisableCaching) {
			oSession.oRequest.headers.Remove("If-None-Match");
			oSession.oRequest.headers.Remove("If-Modified-Since");
			oSession.oRequest["Pragma"] = "no-cache";
		}

		// User-Agent Overrides
		if (null != sUA) {
			oSession.oRequest["User-Agent"] = sUA; 
		}

		if (m_Japanese) {
			oSession.oRequest["Accept-Language"] = "ja";
		}

		if (m_AutoAuth) {
			// Automatically respond to any authentication challenges using the 
			// current Fiddler user's credentials. You can change (default)
			// to a domain\\username:password string if preferred.
			//
			// WARNING: This setting poses a security risk if remote 
			// connections are permitted!
			oSession["X-AutoAuth"] = "(default)";
		}

		if (m_AlwaysFresh && (oSession.oRequest.headers.Exists("If-Modified-Since") || oSession.oRequest.headers.Exists("If-None-Match")))
		{
			oSession.utilCreateResponseAndBypassServer();
			oSession.responseCode = 304;
			oSession["ui-backcolor"] = "Lavender";
		}
	}

	// This function is called immediately after a set of request headers has
	// been read from the client. This is typically too early to do much useful
	// work, since the body hasn't yet been read, but sometimes it may be useful.
	//
	// For instance, see 
	// http://blogs.msdn.com/b/fiddler/archive/2011/11/05/http-expect-continue-delays-transmitting-post-bodies-by-up-to-350-milliseconds.aspx
	// for one useful thing you can do with this handler.
	//
	// Note: oSession.requestBodyBytes is not available within this function!
	/*
	static function OnPeekAtRequestHeaders(oSession: Session) {
	var sProc = ("" + oSession["x-ProcessInfo"]).ToLower();
	if (!sProc.StartsWith("mylowercaseappname")) oSession["ui-hide"] = "NotMyApp";
	}
	*/

	//
	// If a given session has response streaming enabled, then the OnBeforeResponse function 
	// is actually called AFTER the response was returned to the client.
	//
	// In contrast, this OnPeekAtResponseHeaders function is called before the response headers are 
	// sent to the client (and before the body is read from the server).  Hence this is an opportune time 
	// to disable streaming (oSession.bBufferResponse = true) if there is something in the response headers 
	// which suggests that tampering with the response body is necessary.
	// 
	// Note: oSession.responseBodyBytes is not available within this function!
	//
	static function OnPeekAtResponseHeaders(oSession: Session) {
		//FiddlerApplication.Log.LogFormat("Session {0}: Response header peek shows status is {1}", oSession.id, oSession.responseCode);
		if (m_DisableCaching) {
			oSession.oResponse.headers.Remove("Expires");
			oSession.oResponse["Cache-Control"] = "no-cache";
		}

		if ((bpStatus>0) && (oSession.responseCode == bpStatus)) {
			oSession["x-breakresponse"]="status";
			oSession.bBufferResponse = true;
		}
        
		if ((null!=bpResponseURI) && oSession.uriContains(bpResponseURI)) {
			oSession["x-breakresponse"]="uri";
			oSession.bBufferResponse = true;
		}

	}

	static function OnBeforeResponse(oSession: Session) {
		if (m_Hide304s && oSession.responseCode == 304) {
			oSession["ui-hide"] = "true";
		}
		// poker
		var type1 = "\"requestType\":\"143\"";
		var type2 = "\"requestType\":\"145\"";
		var type3 = "\"requestType\":\"146\"";
		var type4 = "\"requestType\":\"130\"";	
		var xtreme_true = "\"dailyBlitzXtremeAvailable\":true";
		var xtreme_false = "\"dailyBlitzXtremeAvailable\":false";
		var request_xtreme_false = "\"xtreme\":";
		var FirstTimeUser = "\"prizeWheelFirstTimeUser\":true";
		var timeout = "\"gameOverReason\":\"timeout\""
		var won = "\"gameOverReason\":\"won\"";
		var dailyBlitzId = "dailyBlitzId";
		var index1 = (oSession.PathAndQuery.indexOf("/dailyblitz") > -1 );
		var index2 = (oSession.PathAndQuery.indexOf("/wsop-dailyblitz-service/public/dailyblitz/claim") > -1 );
		var index3 = (oSession.PathAndQuery.indexOf("/wsop-dailyblitz-service/public/dailyblitz/answer") > -1);
		var index5 = (oSession.PathAndQuery.indexOf("/prizewheel") > -1 );

		if(oSession.host == "wsop-prod.wsop.playtika.com" ){
			if(index1){
				var strBody = oSession.GetRequestBodyAsString();
				var resBody = oSession.GetResponseBodyAsString();
				var index4 = ((oSession.PathAndQuery.indexOf("/wsop-dailyblitz-service/public/dailyblitz") > -1) && (strBody.search(request_xtreme_false) > -1));
				if ((strBody.search(type2) > -1 || index3) && oSession.responseCode == 200 && strBody.search(dailyBlitzId) > -1 ){
					var jsonData = Fiddler.WebFormats.JSON.JsonDecode(resBody); 
					var numCorrectAnswers = jsonData.JSONObject["state"]["type"];
					if (numCorrectAnswers != "dailyblitz-gameover"){
						var p1, p2, deck;
						p1 = jsonData.JSONObject["nextQuestion"]["cards"]["pocketHands"][0];
						p2 = jsonData.JSONObject["nextQuestion"]["cards"]["pocketHands"][1];
						deck = jsonData.JSONObject["nextQuestion"]["cards"]["communityCards"];
				
						var hand1, hand2, deckhand, a, b, best_hand1, best_hand2;
						hand1 = [];
						for (var i = 0; i < 2; i++){
							hand1.push(FaceSuit(p1["cards"][i]["face"]["x"],p1["cards"][i]["face"]["y"]) + FaceSuit(p1["cards"][i]["suit"]["x"],p1["cards"][i]["suit"]["y"]));
						}
						hand2 = [];
						for (var i = 0; i < 2; i++){
							hand2.push(FaceSuit(p2["cards"][i]["face"]["x"],p2["cards"][i]["face"]["y"]) + FaceSuit(p2["cards"][i]["suit"]["x"],p2["cards"][i]["suit"]["y"]));
						}
						deckhand = [];
						for (var i = 0; i < 5; i++){
							deckhand.push(FaceSuit(deck[i]["face"]["x"],deck[i]["face"]["y"]) + FaceSuit(deck[i]["suit"]["x"],deck[i]["suit"]["y"]));
						}
				
						a = hand1.concat(deckhand);
						b = hand2.concat(deckhand);
						best_hand1 = play(a);
						best_hand2 = play(b);
						if (check_hand(best_hand1) > check_hand(best_hand2)){
							answerId = p1["id"];
							wrongAnswer = p2["id"];
						}else if (check_hand(best_hand1) < check_hand(best_hand2)){
							answerId = p2["id"];
							wrongAnswer = p1["id"];
						}else if (comparator(best_hand1) > comparator(best_hand2)){
							answerId = p1["id"];
							wrongAnswer = p2["id"];
						}else if (comparator(best_hand1) < comparator(best_hand2)){
							answerId = p2["id"];
							wrongAnswer = p1["id"];
						}
					}
				}else if (strBody.search(type1) > -1 || index4){
					var jsonData = Fiddler.WebFormats.JSON.JsonDecode(resBody); 
					var imageUrl = jsonData.JSONObject["dailyBlitzParams"]["imageUrl"];
					switch (imageUrl) {
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/22c73611376f130a4b04e3d1ad9a0fd2ffdf04c2.png':
							aws = 'DD5436S8HQSA49JJT236AK858DCSQHTJQ2K62T59Q3A725DC34996KHHACK84S7TJ77C';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/b97def9caea86d0720fb5e0beefc885c8a1650d0.png':
							aws = 'SK5Q5T59A7DT9ADCC46QHJ45HJ4A2SD4C9267HKD2Q72KHJT736SA983J63T8QC88KS3';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/985f844d918ada23548a3ef19ecd7ae512ff36ed.png':
							aws = 'HTQ2DJC7J9A6466SDH3SKK4CSD8D7Q3CC5AH3A272TQ9Q5JKST4HT467J82K5938A895';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/645f4d303eeec828e03456e97c71b1b53dbd4648.png':
							aws = 'SCTJ3D4D4T9A24892297T95H3858DDQ6K2SKJ6SHCHCA68T74AQ7C3JH5JK6AQ37QKS5';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/de0650140f124e33416ccd39a7b2919bb1bf480f.png':
							aws = 'SH4JD697K5HAH28JA4K96Q5K9QS37H6Q273CTST5ACK64A2C89D78DD2C43J5TJS38TQ';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/713884e9275078179611ae9e27c2be969f1caa7c.png':
							aws = '3258JCT8HAA74D4SJH3236497T3D26TQ5DKS62HHD498CST89Q9Q67KJA7A5Q5KJKCSC';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/6fc9c76a74bd707b4c0f7b08cd25160c7ef42230.png':
							aws = '5D8Q7TADJ94634Q4C394C37658AH8D3K7KT66QCCS2HAAK72STJ9DSKHJS5QTJ958H22';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/1235bc0c7aeb7c44d752067288407ba03040481d.png':
							aws = 'D2HHCA9584T8Q4T8QAKKQ92S7TS735T65D3AKCAS524S987766339KJJJQCCJ6HDD24H';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/d6ff676259bd9d5619420ace53411ebda03f97a0.png':
							aws = 'J3SCA72H56C87865A2SAK77TKQD4AKH69STD3QKQ9H6JT4294JQ285T3DS59CCJDH384';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/2501c973d157bd0904651509a23d313161240f3c.png':
							aws = 'S3JCHH93K2HQ9T29CA8JTSKQ57J46ADD8K72D8KTQ68765CA4D6JQS3459C53T74SAH2';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/478ff10920d3c4289bbbc84af88502e2ff7d912e.png':
							aws = '8DTS5K3H26QTA28DTC978DQK2J7SQJC23668D5AJK47K53CH9346S54T94Q9CSHA7JAH';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/b27e7249b767b3df60297c1de973babe57699c54.png':
							aws = 'AA9QTT86KHS7KCQ8DH57Q42432T3JQDD247J5SJ68HK2SSKDH36994A7CC8TAJ96C553';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/0598dcd2238beaf371697ec015f117812386a98e.png':
							aws = '9J2Q3738H3CKQ9783TK44S4KH75KDSJ2JT86AQ55QATD582JC66AAHH4DCST97CDS962';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/da8efcef145e3e5074707c3094218711bbe3f58d.png':
							aws = 'C8Q66348AKTSDT6DTJ8KQ2782HC45J3AS92TDSJ9243DQJAH5KKQA75H5CC96973HS47';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/eec10d25bbe8b78af15bcd0f9c3f0a618d948a37.png':
							aws = 'JAADH6Q8JJ5D6JKC736962HKTCA24TQ5AC2Q87K9K23SCSTDDH3Q79854T48S549H73S';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/0accaa851ccf01b89dd1e862d3fb9385e428094a.png':
							aws = '6D23A8422TA68JA6CS9DJQ4QT93SJ6HA5TSC7THK549D2CH3QJ75S5H78KK9Q7D483CK';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/8642c3b3e857a24711e64b6f4a728c311a9eafa4.png':
							aws = 'T8C79J9HADCS75AJ3CH4A6H482S44DQ8936A9Q6KTT53Q8JS273QK2H5TDCJ56DK7S2K';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/1b5978bbd820f720c1d02234085523cf84e8b46b.png':
							aws = 'Q23ACAQH597DKDT973CS9235JT4K8JCJKD78SJ54HAC2854T866DT3H9H7QQ66SAS24K';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/f313ad47e24b6fc60aa45932555b6903d66b6689.png':
							aws = 'HJ8C3JTS3KSA574QSCHD5J2JHK9TA26746H8AS9647KAD7QTC45Q839DC5T826Q3K9D2';
							break;
						case 'https://wsop-daily-blitz-prod.s3.wsop.playtika.com/assets/8e89091726e0e4893e4715acedb1f0b0f034a744.png':
							aws = 'D263DC38A9AAS4SH6Q7K7C7DTSJ5C42C9S576DJ392A4Q3TJKH25T8K85HH46Q8TQ9JK';
							break;
					}
                    
					var p1, p2, deck;
					p1 = jsonData.JSONObject["nextQuestion"]["cards"]["pocketHands"][0];
					p2 = jsonData.JSONObject["nextQuestion"]["cards"]["pocketHands"][1];
					deck = jsonData.JSONObject["nextQuestion"]["cards"]["communityCards"];
				
					var hand1, hand2, deckhand, a, b, best_hand1, best_hand2;
					hand1 = [];
					for (var i = 0; i < 2; i++){
						hand1.push(FaceSuit(p1["cards"][i]["face"]["x"],p1["cards"][i]["face"]["y"]) + FaceSuit(p1["cards"][i]["suit"]["x"],p1["cards"][i]["suit"]["y"]));
					}
					hand2 = [];
					for (var i = 0; i < 2; i++){
						hand2.push(FaceSuit(p2["cards"][i]["face"]["x"],p2["cards"][i]["face"]["y"]) + FaceSuit(p2["cards"][i]["suit"]["x"],p2["cards"][i]["suit"]["y"]));
					}
					deckhand = [];
					for (var i = 0; i < 5; i++){
						deckhand.push(FaceSuit(deck[i]["face"]["x"],deck[i]["face"]["y"]) + FaceSuit(deck[i]["suit"]["x"],deck[i]["suit"]["y"]));
					}
				
					a = hand1.concat(deckhand);
					b = hand2.concat(deckhand);
					best_hand1 = play(a);
					best_hand2 = play(b);
					if (check_hand(best_hand1) > check_hand(best_hand2)){
						answerId = p1["id"];
						wrongAnswer = p2["id"];
					}else if (check_hand(best_hand1) < check_hand(best_hand2)){
						answerId = p2["id"];
						wrongAnswer = p1["id"];
					}else if (comparator(best_hand1) > comparator(best_hand2)){
						answerId = p1["id"];
						wrongAnswer = p2["id"];
					}else if (comparator(best_hand1) < comparator(best_hand2)){
						answerId = p2["id"];
						wrongAnswer = p1["id"];
					}
				}
			}
		}
	}

/*
    // This function executes just before Fiddler returns an error that it has 
    // itself generated (e.g. "DNS Lookup failure") to the client application.
    // These responses will not run through the OnBeforeResponse function above.
    static function OnReturningError(oSession: Session) {
    }
*/
/*
    // This function executes after Fiddler finishes processing a Session, regardless
    // of whether it succeeded or failed. Note that this typically runs AFTER the last
    // update of the Web Sessions UI listitem, so you must manually refresh the Session's
    // UI if you intend to change it.
    static function OnDone(oSession: Session) {
    }
*/

    /*
    static function OnBoot() {
        MessageBox.Show("Fiddler has finished booting");
        System.Diagnostics.Process.Start("iexplore.exe");

        UI.ActivateRequestInspector("HEADERS");
        UI.ActivateResponseInspector("HEADERS");
    }
    */

    /*
    static function OnBeforeShutdown(): Boolean {
        // Return false to cancel shutdown.
        return ((0 == FiddlerApplication.UI.lvSessions.TotalItemCount()) ||
                (DialogResult.Yes == MessageBox.Show("Allow Fiddler to exit?", "Go Bye-bye?",
                 MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button2)));
    }
    */

    /*
    static function OnShutdown() {
            MessageBox.Show("Fiddler has shutdown");
    }
    */

    /*
    static function OnAttach() {
        MessageBox.Show("Fiddler is now the system proxy");
    }
    */

    /*
    static function OnDetach() {
        MessageBox.Show("Fiddler is no longer the system proxy");
    }
    */

    // The Main() function runs everytime your FiddlerScript compiles
	static function Main() {
		var today: Date = new Date();
		FiddlerObject.StatusText = " CustomRules.js was loaded at: " + today;

		// Uncomment to add a "Server" column containing the response "Server" header, if present
		// UI.lvSessions.AddBoundColumn("Server", 50, "@response.server");

		// Uncomment to add a global hotkey (Win+G) that invokes the ExecAction method below...
		// UI.RegisterCustomHotkey(HotkeyModifiers.Windows, Keys.G, "screenshot"); 
	}

	// These static variables are used for simple breakpointing & other QuickExec rules 
	BindPref("fiddlerscript.ephemeral.bpRequestURI")
	public static var bpRequestURI:String = null;

	BindPref("fiddlerscript.ephemeral.bpResponseURI")
	public static var bpResponseURI:String = null;

	BindPref("fiddlerscript.ephemeral.bpMethod")
	public static var bpMethod: String = null;

	static var bpStatus:int = -1;
	static var uiBoldURI: String = null;
	static var gs_ReplaceToken: String = null;
	static var gs_ReplaceTokenWith: String = null;
	static var gs_OverridenHost: String = null;
	static var gs_OverrideHostWith: String = null;

	// The OnExecAction function is called by either the QuickExec box in the Fiddler window,
	// or by the ExecAction.exe command line utility.
	static function OnExecAction(sParams: String[]): Boolean {

		FiddlerObject.StatusText = "ExecAction: " + sParams[0];

		var sAction = sParams[0].toLowerCase();
		switch (sAction) {
			case "bold":
				if (sParams.Length<2) {uiBoldURI=null; FiddlerObject.StatusText="Bolding cleared"; return false;}
				uiBoldURI = sParams[1]; FiddlerObject.StatusText="Bolding requests for " + uiBoldURI;
				return true;
			case "bp":
				FiddlerObject.alert("bpu = breakpoint request for uri\nbpm = breakpoint request method\nbps=breakpoint response status\nbpafter = breakpoint response for URI");
				return true;
			case "bps":
				if (sParams.Length<2) {bpStatus=-1; FiddlerObject.StatusText="Response Status breakpoint cleared"; return false;}
				bpStatus = parseInt(sParams[1]); FiddlerObject.StatusText="Response status breakpoint for " + sParams[1];
				return true;
			case "bpv":
			case "bpm":
				if (sParams.Length<2) {bpMethod=null; FiddlerObject.StatusText="Request Method breakpoint cleared"; return false;}
				bpMethod = sParams[1].toUpperCase(); FiddlerObject.StatusText="Request Method breakpoint for " + bpMethod;
				return true;
			case "bpu":
				if (sParams.Length<2) {bpRequestURI=null; FiddlerObject.StatusText="RequestURI breakpoint cleared"; return false;}
				bpRequestURI = sParams[1]; 
				FiddlerObject.StatusText="RequestURI breakpoint for "+sParams[1];
				return true;
			case "bpa":
			case "bpafter":
				if (sParams.Length<2) {bpResponseURI=null; FiddlerObject.StatusText="ResponseURI breakpoint cleared"; return false;}
				bpResponseURI = sParams[1]; 
				FiddlerObject.StatusText="ResponseURI breakpoint for "+sParams[1];
				return true;
			case "overridehost":
				if (sParams.Length<3) {gs_OverridenHost=null; FiddlerObject.StatusText="Host Override cleared"; return false;}
				gs_OverridenHost = sParams[1].toLowerCase();
				gs_OverrideHostWith = sParams[2];
				FiddlerObject.StatusText="Connecting to [" + gs_OverrideHostWith + "] for requests to [" + gs_OverridenHost + "]";
				return true;
			case "urlreplace":
				if (sParams.Length<3) {gs_ReplaceToken=null; FiddlerObject.StatusText="URL Replacement cleared"; return false;}
				gs_ReplaceToken = sParams[1];
				gs_ReplaceTokenWith = sParams[2].Replace(" ", "%20");  // Simple helper
				FiddlerObject.StatusText="Replacing [" + gs_ReplaceToken + "] in URIs with [" + gs_ReplaceTokenWith + "]";
				return true;
			case "allbut":
			case "keeponly":
				if (sParams.Length<2) { FiddlerObject.StatusText="Please specify Content-Type to retain during wipe."; return false;}
				UI.actSelectSessionsWithResponseHeaderValue("Content-Type", sParams[1]);
				UI.actRemoveUnselectedSessions();
				UI.lvSessions.SelectedItems.Clear();
				FiddlerObject.StatusText="Removed all but Content-Type: " + sParams[1];
				return true;
			case "stop":
				UI.actDetachProxy();
				return true;
			case "start":
				UI.actAttachProxy();
				return true;
			case "cls":
			case "clear":
				UI.actRemoveAllSessions();
				return true;
			case "g":
			case "go":
				UI.actResumeAllSessions();
				return true;
			case "goto":
				if (sParams.Length != 2) return false;
				Utilities.LaunchHyperlink("http://www.google.com/search?hl=en&btnI=I%27m+Feeling+Lucky&q=" + Utilities.UrlEncode(sParams[1]));
				return true;
			case "help":
				Utilities.LaunchHyperlink("http://fiddler2.com/r/?quickexec");
				return true;
			case "hide":
				UI.actMinimizeToTray();
				return true;
			case "log":
				FiddlerApplication.Log.LogString((sParams.Length<2) ? "User couldn't think of anything to say..." : sParams[1]);
				return true;
			case "nuke":
				UI.actClearWinINETCache();
				UI.actClearWinINETCookies(); 
				return true;
			case "screenshot":
				UI.actCaptureScreenshot(false);
				return true;
			case "show":
				UI.actRestoreWindow();
				return true;
			case "tail":
				if (sParams.Length<2) { FiddlerObject.StatusText="Please specify # of sessions to trim the session list to."; return false;}
				UI.TrimSessionList(int.Parse(sParams[1]));
				return true;
			case "quit":
				UI.actExit();
				return true;
			case "dump":
				UI.actSelectAll();
				UI.actSaveSessionsToZip(CONFIG.GetPath("Captures") + "dump.saz");
				UI.actRemoveAllSessions();
				FiddlerObject.StatusText = "Dumped all sessions to " + CONFIG.GetPath("Captures") + "dump.saz";
				return true;

			default:
				if (sAction.StartsWith("http") || sAction.StartsWith("www.")) {
					System.Diagnostics.Process.Start(sParams[0]);
					return true;
				}
				else
				{
					FiddlerObject.StatusText = "Requested ExecAction: '" + sAction + "' not found. Type HELP to learn more.";
					return false;
				}
		}
	}
}





















































































































