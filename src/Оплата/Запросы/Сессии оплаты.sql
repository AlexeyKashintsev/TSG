/**
 *
 * @author Alexey
 * @name dsOplSessions
 * @writable opl_sessions
 * @public
 */ 
Select * 
From opl_sessions t1
 Left Join dsSessionColAndSum q on t1.opl_sessions_id = q.session_id
 Where :sessionid = t1.opl_sessions_id or :sessionid is null