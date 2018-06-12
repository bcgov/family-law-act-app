from django import template
register = template.Library()

@register.simple_tag
def define(val=None):
  return val


def get_at_index(list, index):
  return list[index]


@register.filter
def getItem(dict, key):
  return dict.get(key)
