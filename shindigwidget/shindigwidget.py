"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, Integer
from xblock.fragment import Fragment

class ShindigXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    href = String(help="URL of the video page at the provider", default=None, scope=Scope.content)
    maxwidth = Integer(help="Maximum width of the video", default=800, scope=Scope.content)
    maxheight = Integer(help="Maximum height of the video", default=450, scope=Scope.content)

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def studio_view(self, context):
        """
        Create a fragment used to display the edit view in the Studio.
        """
        html_str = pkg_resources.resource_string(__name__, "static/html/shindigwidget1.html")
        href = self.href or ''
        frag = Fragment(unicode(html_str).format(href=href, maxwidth=self.maxwidth, maxheight=self.maxheight))

        return frag

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the ShindigXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/shindigwidget.html")
        frag = Fragment(html.format(self=self))
        frag.add_javascript(self.resource_string("static/js/src/modernizr.js"))
        frag.add_css(self.resource_string("static/css/shindigwidget.css"))
        frag.add_javascript(self.resource_string("static/js/src/shindigwidget.js"))
        frag.initialize_js('ShindigXBlock')

        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'

        self.count += 1
        return {"count": self.count}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("ShindigXBlock",
             """<vertical_demo>
                <shindigwidget/>
                </vertical_demo>
             """),           
        ]
