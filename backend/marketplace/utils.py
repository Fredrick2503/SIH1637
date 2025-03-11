from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def send_sse_event(data):
    """ Send an event to the SSE stream via Django Channels """
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.send)("sse_channel", {"type": "sse.message", "data": data})
