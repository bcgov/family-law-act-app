from django import template
register = template.Library()

@register.simple_tag
def define(val=None):
  return val


def get_at_index(list, index):
  return list[index]


@register.filter('break')
def break_(loop):
  '''Breaks from a loop.

  The 'break' filter is used within a loop and takes as input a loop variable,
  e.g. 'forloop' in case of a for loop. For example, to display the items
  from list ``items`` up to the first item that is equal to ``end``::

      <ul>
      {% for item in items %}
          {% if item == 'end' %}
              {{ forloop|break }}
          {% endif %}
          <li>{{ item }}</li>
      {% endfor %}
      </ul>

  Breaking from nested loops is also supported by passing the appropriate loop
  variable, e.g. ``forloop.parentloop|break``.
  '''
  raise StopLoopException(loop, False)
