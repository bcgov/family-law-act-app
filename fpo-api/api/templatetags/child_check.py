from django import template
register = template.Library()

@register.simple_tag
def child_match():
  return "n"

children = ["Some Child", "Second Child"]

def set_children(child):

  children.append(child)
  return child

def get_children_name():

  return children
