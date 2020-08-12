import json
import os
import time
import codecs
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
                password=data['password'],
                email=data['email']
            )
            user.save()
        else:
            status = "existed"
        return JsonResponse({
            'status': status
        })

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
            return JsonResponse({
            'status': status,
            'token': username,
            'user': {
                'name': user.username,
                'createTime': user.createTime,
                'avatar': ''
            }
        })
        else:
            status = 'failed'
            return JsonResponse({
              'status': status
            })  

def logout(request):
    return JsonResponse({})

def search(request):
    if request.method == 'GET':
        start = time.time()
        keyword = request.GET['keys']
        pack_size = request.GET['packSize']
        pack_index = request.GET['packIndex']

        json_files = os.listdir(os.path.abspath('data'))
        json_results = []
        for json_file in json_files:
            with codecs.open(os.path.abspath('data') + '/' + json_file, 'r', encoding='utf8') as fp:
                json_result = json.load(fp)
            json_result['times'] = 0
            for content in json_result.values():
                if isinstance(content, str):
                    json_result['times'] += content.count(keyword)
            if json_result['times'] != 0:
                json_results.append(json_result)
        total_time = format(time.time() - start, '.8f')
        json_results.sort(key=lambda file: file['times'], reverse=True)
        return JsonResponse({
          'time': str(total_time) + 's',
          'number': str(len(json_results)),
          'articles': json_results[(pack_index - 1) * pack_size:pack_index * pack_size]
        })
