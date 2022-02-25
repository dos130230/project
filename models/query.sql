

-- userlar olish
select 
    *
from users
;

-- habarlarni olish

select 
    m.message_id,
    u.user_id,
    m.send_message,
    m.file_type,
    u.fullname,
    u.username,
    u.avatar_img
from messages as m
left join users as u on m.send_userId = u.user_id
where (m.send_userId = 1 and m.received_userId = 3) or  (m.send_userId = 3 and m.received_userId = 1)
order by m.message_id 
;
