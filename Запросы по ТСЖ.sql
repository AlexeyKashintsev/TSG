set search_path = tsg_main;

select * from per_date where usr_context = 'tsg_nash_dom';

/*****
 * Показать начальное и конечное сальдо по группам 
 */
select date_id, per_date, sum(sal_begin) as sb, sum(sal_end), count(*) as se from saldo_by_groups sg
inner join per_date pd on sg.date_id = pd.per_date_id
where sg.date_id >= 141795735168822 and group_id = 139187294262795 and account_id = 142486607303119
group by per_date, date_id
order by per_date;


/* Удалить из начислений услуги (те что в скобках) */
delete from per_sums
where date_id = 152144610990725
and flat_service_id in (select lc_flat_services_id from lc_flat_services where services_id in (143280550470727, 143280553105190, 5, 12, 148836894772703))

/*** 
	Начал писать эту функцию
*/

set search_path = tsg_main;
create or replace function tsg_main.find_bad_saldo(date1 numeric, date2 numeric)
returns numeruc, numeric as
$body$
/***********************************************************
 * Найти ошибки при переносе сальдо
 * 
 * date1 - закрывающий месяц
 * date2 - открывающий месяц
 *
 * результат выполнения:
 * lc_id - ID лицевого счета
 * sal_end - закрытие сальдо на закрывающий период
 * sal_beg - открытие сальдо на открывающий период
************************************************************/
select * from saldo_by_groups sg1
inner join saldo_by_groups sg2 on sg1.lc_id = sg2.lc_id and sg1.account_id = sg2.account_id
inner join lc_flat lf on sg1.lc_id = lf.lc_flat_id
where sg1.date_id = 151791611230656 and sg2.date_id = 152024382856301
and sg1.sal_end <> sg2.sal_begin