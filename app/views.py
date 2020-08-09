import json
import os
import time

from django.http import JsonResponse

from .models import User


def register(request):
    status = ''
    if request.method == 'POST':
        data = json.loads(request.body, encoding='utf-8')
        username = data['username']
        user_exist = User.objects.filter(username=username)
        if not user_exist:
            status = 'create'
            user = User.objects.create(
                username=username,
                password=data['password']
            )
            user.save()
        else:
            status = "existed"
        return JsonResponse({'status': status})


def login(request):
    status = ''
    if request.method == 'POST':
        data = json.loads(request.body, encoding='utf-8')
        username = data['username']
        user_exist = User.objects.filter(
            username=data['username'],
            password=data['password']
        )
        if user_exist:
            status = 'success'
            user = User.objects.get(username=data['username'])
        else:
            status = 'failed'
        print(status)
        return JsonResponse({
            'status': status,
            'token': username,
            'user': {
                'name': user.username,
                'createTime': user.createTime
            }
        })


def logout(request):
    return JsonResponse({})


def search(request):
    if request.method == 'GET':
        start = time.time()
        keyword = request.GET['keys']
        path = os.getcwd() + r'\data'
        json_files = os.listdir(path)
        json_results = []
        for json_file in json_files:
            fp = open(path + '\\' + json_file, "r", encoding="utf-8")
            json_result = json.load(fp)
            for content in json_result.values():
                if keyword in content:
                    json_results.append(json_result)
        total_time = format(time.time() - start, '.8f')
        return JsonResponse({
          'time': str(total_time) + 's',
          'articles': json_results
        })
