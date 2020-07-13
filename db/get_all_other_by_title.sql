select * from posts p
join users u on p.author_id = u.id
where title like concat('%', ${search}, '%') and u.id != ${id};