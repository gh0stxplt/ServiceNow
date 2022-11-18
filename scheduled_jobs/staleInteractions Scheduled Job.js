/*
*   Since there is no OOB behavior for closing stale interactions, this scheduled job
*   will query all active Phone type interactions from the prior day and update them 
*   to closed complete. Date range can be customized with a new encoded query if needed.
*/
var staleInteractions = new GlideRecord('interaction');
staleInteractions.addEncodedQuery("active=true^type=Phone^opened_at<javascript:gs.beginningOfToday()");
staleInteractions.query();
while (staleInteractions.next()) {
    staleInteractions.setValue('state', 'closed_complete');
    staleInteractions.update();
}

gs.log("Stale interactions closed on " + new GlideDateTime().getDate() + " - " + staleInteractions.getRowCount());