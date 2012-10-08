'''
Created on Oct 7, 2012

@author: jonathan
'''
import StringIO
import struct
import urllib2
from bs4 import BeautifulSoup


def largestImage(url):
    
    page = BeautifulSoup(urllib2.urlopen(url))
    imgs = page.findAll('img')
    maxsize = 0
    maxurl = ""
    for img in imgs:
        imgurl = url+img['src']
        try:
            info = getRemoteImageInfo(imgurl)
        except Exception, e:
            print "%s had error %s" % (img['src'], e)
            continue
        size = info[1] * info[2]
        if size > maxsize:
            maxsize = size
            maxurl = imgurl
    return maxurl
        


def getRemoteImageInfo(url):
    image = urllib2.urlopen(url)
    data = str(image.read(2))
    height = -1
    width = -1
    content_type = ''
    
    if data.startswith('\377\330'):
        content_type = 'image/jpeg'
        b = image.read(1)
        try:
            while (b and ord(b) != 0xDA):
                while (ord(b) != 0xFF): b = image.read(1)
                while (ord(b) == 0xFF): b = image.read(1)
                if (ord(b) >= 0xC0 and ord(b) <= 0xC3):
                    image.read(3)
                    h, w = struct.unpack(">HH", image.read(4))
                    break
                else:
                    image.read(int(struct.unpack(">H", image.read(2))[0])-2)
                b = image.read(1)
            width = int(w)
            height = int(h)
        except struct.error:
            pass
        except ValueError:
            pass
    return content_type, width, height

