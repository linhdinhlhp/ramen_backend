# TEL=0913137399
# CONTENT="TiengVietKhongDau"
# curl "https://api.speedsms.vn/index.php/sms/send?access-token=3OfhP1u285VQcuIGCvtDc6TAzvtbEmlP&to=84965563482&content=Dayla&type=5&sender=84965563482"
# #curl "https://api.speedsms.vn/index.php/user/info?access-token=ekXltPAtFoELUo8gS5nQ-V8kPOuDQ6lK"
# curl -i -u "3OfhP1u285VQcuIGCvtDc6TAzvtbEmlP:x" "http://api.speedsms.vn/index.php/user/info"
# curl -i -u "3OfhP1u285VQcuIGCvtDc6TAzvtbEmlP" -H "Content-Type: application/json" -X POST -d '{"to": ["0965563482"], "content": "noi dung sms", "sms_type": 2, "sender": ""}' https://api.speedsms.vn/index.php/sms/send

curl "https://api.speedsms.vn/index.php/user/info?access-token=3OfhP1u285VQcuIGCvtDc6TAzvtbEmlP"
